import * as Sentry from "@sentry/react";

const isProd = import.meta.env.PROD;

export const logger = {
    error: (message, error, context = {}) => {
        if (!isProd) {
            console.error(`[Internal Error] ${message}:`, error);
        }

        Sentry.withScope((scope) => {
            if (context) scope.setExtras(context);
            Sentry.captureException(error || new Error(message));
        });
    },

    info: (message, data = {}) => {
        if (!isProd) {
            console.info(`[Info] ${message}`, data);
        }
        Sentry.addBreadcrumb({
            category: "info",
            message: message,
            level: "info",
            data: data
        });
    },

    // lier l'utilisateur actuel aux erreurs dans Sentry
    setUser: (user) => {
        if (user) {
            Sentry.setUser({ id: user.id, email: user.email, username: user.username });
        } else {
            Sentry.setUser(null);
        }
    }
};