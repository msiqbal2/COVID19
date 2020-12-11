import React, {Suspense} from "react";
import {SideBar} from "../SideBar/SideBar";
import {Switch, Route, Router} from "react-router";
import {createBrowserHistory} from "history";
import {Login} from "../Login/Login";
import { Management } from "../Management/Management";
import { Statistics } from "../Statistics/Statistics";

export const history = createBrowserHistory()

export function Dashboard () {

    const history = createBrowserHistory();

    return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route exact path={'/login'} render={() =>
                            <Suspense fallback={""}>
                                <Login/>
                            </Suspense>
                        }/>
                    </Switch>
                    <Switch>
                        <Route exact path={'/statistics'} render={() =>
                            <Suspense fallback={""}>
                                <>
                                    <SideBar/>
                                    <Statistics/>
                                </>
                            </Suspense>
                        }/>
                    </Switch>
                    <Switch>
                        <Route exact path={'/management'} render={() =>
                            <Suspense fallback={""}>
                                <>
                                    <SideBar/>
                                    <Management/>
                                </>
                            </Suspense>
                        }/>
                    </Switch>
                    <Switch>
                        <Route exact path={'/'} render={() =>
                            <Suspense fallback={""}>
                                <>
                                    <SideBar/>
                                </>
                            </Suspense>
                        }/>
                    </Switch>
                </Router>
            </div>
    );
}
