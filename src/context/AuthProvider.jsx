// import axios from "axios";
// import React, { createContext, useContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [blogs, setBlogs] = useState();
//   const [profile, setProfile] = useState();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         // token should be let type variable because its value will change in every login. (in backend also)
//         let token = localStorage.getItem("jwt"); // Retrieve the token directly from the localStorage (Go to login.jsx)
//         console.log(token);
//         if (token) {
//           const { data } = await axios.get(
//             "https://blog-mern-back-7ao5.onrender.com/api/users/my-profile",
//             {
//               withCredentials: true,
//               headers: {
//                 "Content-Type": "application/json",
//               },
//             }
//           );
//           console.log(data.user);
//           setProfile(data.user);
//           setIsAuthenticated(true);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     const fetchBlogs = async () => {
//       try {
//         const { data } = await axios.get(
//           "https://blog-mern-back-7ao5.onrender.com/api/blogs/all-blogs",
//           { withCredentials: true }
//         );
//         console.log(data);
//         setBlogs(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchBlogs();
//     fetchProfile();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         blogs,
//         profile,
//         setProfile,
//         isAuthenticated,
//         setIsAuthenticated,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (token) {
          const { data } = await axios.get(
            "https://blog-mern-back-7ao5.onrender.com/api/users/my-profile",
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setProfile(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Handle error if needed
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          "https://blog-mern-back-7ao5.onrender.com/api/blogs/all-blogs",
          { withCredentials: true }
        );
        setBlogs(data);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchBlogs();
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
