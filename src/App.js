import 'antd/dist/reset.css';
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import AppRouter from './router/AppRouter';

function App() {
  return (
    <div className="App">
      <AppRouter/>
    </div>
  );
}

export default App;
