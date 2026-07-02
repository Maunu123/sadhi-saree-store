import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.find(
      (user) => user.email === userData.email
    );

    if (emailExists) {
      return {
        success: false,
        message: "Email already exists",
      };
    }

    const newUser = {
      id: Date.now(),
      ...userData,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem(
      "currentUser",
      JSON.stringify(newUser)
    );

    setCurrentUser(newUser);

    return {
      success: true,
    };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (item) =>
        item.email === email &&
        item.password === password
    );

    if (!user) {
      return {
        success: false,
        message: "Invalid Email or Password",
      };
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    setCurrentUser(user);

    return {
      success: true,
    };
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const updateProfile = (updatedData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((user) =>
      user.id === currentUser.id
        ? {
            ...user,
            ...updatedData,
          }
        : user
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    const updatedUser = {
      ...currentUser,
      ...updatedData,
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );

    setCurrentUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
