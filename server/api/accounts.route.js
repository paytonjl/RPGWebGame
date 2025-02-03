import express from "express";
import AccountsCtrl from "./accounts.controller.js";

// This class handles initializing the adventure router as well as binding the
// adventure controller to it.
export default class accountsRouterInitializer {
    constructor(accountsController) {
        this.accountsController = accountsController;
        this.accountsRouter = express.Router();

        // Bind controller methods to router routes
        this.bindRoutes();
    }

    // In order for the router to actually call the method function of
    // this.accountsController, you need to bind the actual instance of the
    // object to it. If you don't do that it will call the api
    // methods as if it was static and then the function wouldn't have access
    // to the object's member variables.
    bindRoutes() {
        this.accountsRouter
            .route("/beginningSession")
            .post(
                this.accountsController.apiBeginningSession.bind(
                    this.accountsController
                )
            );
        this.accountsRouter
            .route("/login")
            .post(
                this.accountsController.apiLoginAccount.bind(
                    this.accountsController
                )
            );
        this.accountsRouter
            .route("/create_account")
            .post(
                this.accountsController.apiCreateAccount.bind(
                    this.accountsController
                )
            );
        this.accountsRouter
            .route("/get_user")
            .post(
                this.accountsController.apiGetUser.bind(this.accountsController)
            );
        this.accountsRouter
            .route("/get_username")
            .post(
                this.accountsController.apiGetUsername.bind(this.accountsController)
            );
        this.accountsRouter
            .route("/logout")
            .post(
                this.accountsController.apiLogOut.bind(this.accountsController)
            )
        this.accountsRouter
            .route("/get_menus")
            .post(
                this.accountsController.apiGetMenus.bind(this.accountsController)
            )
    }

    getAccountsRouter() {
        return this.accountsRouter;
    }
}
