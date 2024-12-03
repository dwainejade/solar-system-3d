export const getSpeedValue = (key) => {
    switch (key) {
        case "-1 year /s":
            return -31557600;
        case "-1 month /s":
            return -2629800;
        case "-1 week /s":
            return -604800;
        case "-1 day /s":
            return -86400;
        case "-1 hour /s":
            return -3600;
        case "-1 minute /s":
            return -60;
        case "real time":
            return 1;
        case "1 minute /s":
            return 60;
        case "1 hour /s":
            return 3600;
        case "1 day /s":
            return 86400;
        case "1 week /s":
            return 604800;
        case "1 month /s":
            return 2629800;
        case "1 year /s":
            return 31557600;
        default:
            return 1;
    }
}
