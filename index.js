const react = require("react");
const extractDomain = require("extract-domain");
const { getCookie, hasCookie, setCookie } = require("cookies-next");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

module.exports = function StupendousAnalytics({ site }) {
    react.useEffect(() => {
        const hostname = document.location.hostname;
        const path = document.location.pathname;
        const host = extractDomain(document.referrer) || "Direct";
        const referrer = document.referrer || "Direct";
        const height = window.innerHeight;
        const width = window.innerWidth;
        const localTimestamp = new Date();
        !hasCookie("stupendous_analytics") &&
        setCookie("stupendous_analytics", uuidv4());
        const session = getCookie("stupendous_analytics");

        const data = {
            site: site,
            path: path,
            host: host,
            referrer: referrer,
            height: height,
            width: width,
            localTimestamp: localTimestamp,
            session: session,
        };

        if (hostname !== "localhost") {
            axios.post("https://stupendousanalytics.com/api/pageviews", data);
        }
    });

    return null;
};
