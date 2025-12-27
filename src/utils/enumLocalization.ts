// Removed invalid import
// import { TFunction } from 'i18next';

export const getLocalizedIssueStatus = (status: string, t: (key: string) => string): string => {
    return t(`enums.status.${status}`);
};

export const getLocalizedIssuePriority = (priority: string, t: (key: string) => string): string => {
    return t(`enums.priority.${priority}`);
};
