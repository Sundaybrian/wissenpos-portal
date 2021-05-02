import moment from "moment";
export default function formatDate(someDate) {
    return moment(someDate).format("MMM Do YY");
}
