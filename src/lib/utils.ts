let utils = {

    sendSessionExpired: (res: any) => {
        return res.status(401).send({ 
            status: 401, 
            message: "session has expired" 
        });
    },

    sendNotAuthorized: (res: any) => {
        return res.status(401).send({ 
            status: 401, 
            message: "not authorized" 
        });
    },

    sendFailedResponse: (res: any, message: any, body: any) => {
        return res.status(404).send({
            status: 404, 
            message: message, 
            data: body
        });
    },

    sendQueryFailResponse: (res: any, cause: any) => {
        return res.status(500).send({ 
            status: 500, 
            message: 'query not satisfied cause ' + cause 
        });
    },

    sendSuccessResponse (res: any, message: any, body: any) {
        res.status(200).send({
            status: 200,
            message: message,
            data: body,
            options: this.build()
        });
        this.deleteResponse()
    },

    response : {},
    
    deleteResponse(){
        this.response = {}
    },

    setFormat(format: any) {
        this.response.format = format;
        return this;
    },

    setAction (action: any) {
        this.response.action = action;
        return this;
    },

    setLinks(links: any) {
        this.response.links = links;
        return this;
    },

    setIncludes(includes: any) {
        this.response.includes = includes;
        return this;
    },

    build() {
      return {
        format: this.response.format,
        action: this.response.action,
        links: this.response.links,
        include: this.response.includes,
      };
    }
};

export default utils;
