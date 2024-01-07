/**
 * Gets two letters from the username to use it as an avatar if the user does not have a avatar url
 * @return string
 */
export const getAvatarName = (username: string): string => {
    return username.substring(0, 2).toUpperCase();
};
