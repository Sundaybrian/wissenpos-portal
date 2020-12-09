const develop = {
    BACKEND_SERVICE: "https://wissenspos.herokuapp.com/api/v1",
};

const local = {
    BACKEND_SERVICE: "http://localhost:5000/api/v1",
};

const choose = {
    develop,
    local,
};

const config = process.env.REACT_APP_STAGE
    ? choose[process.env.REACT_APP_STAGE]
    : choose["develop"];

export default config;
