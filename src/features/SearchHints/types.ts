import { CityList, CityListItem } from "shared/types/api-types";

export type SearchHintsProps = {
    hints: CityList
    onHintClick: (item: CityListItem) => void;
};

