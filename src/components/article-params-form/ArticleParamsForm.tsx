import React, { useState, useRef } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	fontColors,
	fontFamilyOptions,
	OptionType,
	fontSizeOptions,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
	const [selectArticleState, setSelectArticleState] =
		useState<ArticleStateType>(articleState);

	const OutsideClickClose = useRef<HTMLDivElement>(null);

	const inputChangeHandler = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setSelectArticleState((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	useOutsideClickClose({
		isOpen: isOpenForm,
		onChange: setIsOpenForm,
		rootRef: OutsideClickClose,
		onClose: () => setSelectArticleState(articleState),
	});

	const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleState(selectArticleState);
	};

	const resetFormHandler = () => {
		setSelectArticleState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<div ref={OutsideClickClose}>
				<ArrowButton toggleSidebar={setIsOpenForm} isOpen={isOpenForm} />
				<aside
					className={clsx(
						styles.container,
						isOpenForm && styles.container_open
					)}>
					<form className={styles.form} onSubmit={formSubmitHandler}>
						<Text as='h2' weight={800} size={31} uppercase>
							Задайте параметры
						</Text>
						<Select
							options={fontFamilyOptions}
							selected={selectArticleState.fontFamilyOption}
							onChange={(selectedElement: OptionType) =>
								inputChangeHandler('fontFamilyOption', selectedElement)
							}
							title='шрифт'
						/>
						<RadioGroup
							name='fontSize'
							title='размер шрифта'
							selected={selectArticleState.fontSizeOption}
							options={fontSizeOptions}
							onChange={(selectedElement: OptionType) =>
								inputChangeHandler('fontSizeOption', selectedElement)
							}
						/>

						<Select
							options={fontColors}
							selected={selectArticleState.fontColor}
							onChange={(selectedElement: OptionType) =>
								inputChangeHandler('fontColor', selectedElement)
							}
							title='цвет шрифта'
						/>
						<Separator />
						<Select
							options={backgroundColors}
							selected={selectArticleState.backgroundColor}
							onChange={(selectedElement: OptionType) =>
								inputChangeHandler('backgroundColor', selectedElement)
							}
							title='цвет фона'
						/>
						<Select
							options={contentWidthArr}
							selected={selectArticleState.contentWidth}
							onChange={(selectedElement: OptionType) =>
								inputChangeHandler('contentWidth', selectedElement)
							}
							title='ширина контента'
						/>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								type='reset'
								onClick={resetFormHandler}
							/>
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
