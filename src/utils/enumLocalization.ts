import { TFunction } from 'i18next';

export const getLocalizedIssueStatus = (status: string, t: TFunction): string => {
    return t(`enums.status.${status}`);
};

export const getLocalizedIssuePriority = (priority: string, t: TFunction): string => {
    return t(`enums.priority.${priority}`);
};
