import { login, register } from "../controllers/controller";

const routes = (app) =>{
    app.route('/sign-up')
        .post(register);

    app.route('/sign-in')
        .post(login);
}

export default routes;