import { createRoot } from 'react-dom/client';
import App from 'src/components/App/App';
import 'font-awesome/css/font-awesome.min.css';

const rootReactElement = <App />;
const root = createRoot(document.getElementById('root'));
root.render(rootReactElement);
