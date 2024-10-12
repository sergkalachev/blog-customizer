import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from './App'; // Импорт нового компонента

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
