import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PATH } from "../constants/path/Path";

import LoginPage from "../pages/login/LoginPage";
import HomePage from "../pages/home/HomePage";
import RegisterPage from "../pages/register/RegisterPage";
import ResetPasswordPage from "../pages/resetpassword/ResetPasswordPage";
import ProfilePage from "../pages/profile/ProfilePage";
import ErrorPage from "../pages/ErrorPage";
import RegistrationPage from '../pages/registration/RegistrationPage.jsx';

import Main from "../components/layout/Main";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path={PATH.LOGIN} element={<LoginPage />} exact />
        <Route path={PATH.REGISTER} element={<RegisterPage />} exact />
        <Route path={PATH.RESET} element={<ResetPasswordPage />} exact />
        <Route path={PATH.REGISTRATION} element={<RegistrationPage />} exact />

        <Route path="*" element={<ErrorPage code={404} />} />
        <Route
          path={PATH.HOME}
          element={
            <Main>
              <HomePage />
            </Main>
          }
          exact
        />
        <Route
          path={PATH.PROFILE}
          element={
            <Main>
              <ProfilePage />
            </Main>
          }
          exact
        />
      </Routes>
    </>
  );
};
export default AppRouter;
