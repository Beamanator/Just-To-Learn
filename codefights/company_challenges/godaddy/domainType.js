function domainType(domains) {
    return domains.map((domain) => {
        switch (domain.split(".").pop()) {
            case "com":
                return "commercial";
            case "org":
                return "organization";
            case "net":
                return "network";
            case "info":
                return "information";
        }
    });
}
