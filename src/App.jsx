
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./admin/redux/store";
import AppRoutes from "./admin/routes/AppRoutes";
import 'leaflet/dist/leaflet.css';


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
