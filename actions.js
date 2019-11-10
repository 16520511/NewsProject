export const userLogIn = (store) => {
    const loggedIn = true;
    store.setState({ loggedIn });
};

export const userLogOut = (store) => {
    const loggedIn = false;
    store.setState({ loggedIn });
};