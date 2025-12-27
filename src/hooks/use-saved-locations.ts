/**
 * Stub hook for saved locations functionality.
 * This feature was removed but the screens that use it remain for potential future use.
 * Returns empty/no-op values to prevent import errors.
 */

const useSavedLocations = () => {
    return {
        savedLocations: [],
        addLocation: async (_location: any) => {
            console.warn('[useSavedLocations] addLocation called but feature is disabled');
            return null;
        },
        deleteLocation: async (_locationId: string) => {
            console.warn('[useSavedLocations] deleteLocation called but feature is disabled');
            return null;
        },
        isLoading: false,
    };
};

export default useSavedLocations;
