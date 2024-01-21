import {createContext, useLayoutEffect, useState} from "react";
import PropTypes from "prop-types";

export const UserInfoContext = createContext(null)

const UserInfoProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState(null)

  useLayoutEffect(() => {
    const UserInfo = localStorage.getItem('UserInfo')
    if (UserInfo) {
      const userInfoParse = JSON.parse(UserInfo)
      setUserInfo(userInfoParse)
    }
  }, []);

  return <UserInfoContext.Provider value={[userInfo, setUserInfo]}>
    {children}
  </UserInfoContext.Provider>
}

UserInfoProvider.propTypes = {
  children: PropTypes.node
}

export default UserInfoProvider
