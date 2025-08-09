import * as React from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { Tier } from '../types'
import { AppContext } from "./AppContext";

export const PtCardListFilter = () => {

    const { selectedTier, setSelectedTier, selectedTeam, setSelectedTeam, selectedDivision, setSelectedDivision, selectedLeague, setSelectedLeague } = React.useContext(AppContext);
    
    const tiers = [
        {label:"Iron", value:Tier.Iron},
        {label:"Bronze", value:Tier.Bronze},
        {label:"Silver", value:Tier.Silver},
        {label:"Gold", value:Tier.Gold},
        {label:"Diamond", value:Tier.Diamond},
        {label:"Perfect", value:Tier.Perfect}
    ];

    const teams = [
        {label:'Philadelphia Phillies', value: 0},
        {label:'Atlanta Braves', value: 1},
        {label:'Los Angeles Dodgers', value: 2},
        {label:'New York Yankees', value: 3},
        {label:'Cleveland Indians', value: 4},
        {label:'Seattle Mariners', value: 5},
    ]

    const divisions = [
        {label:"NL East", value: 0},
        {label:"AL East", value: 1},
        {label:"AL Central", value: 2},
    ]

    const leagues = [
        {label:"National League", value: 0},
        {label:"American League", value: 1},
    ]

    return (
        <div>
            <div className="mb-2">
                <MultiSelect
                    options={tiers}
                    value={selectedTier}
                    onChange={setSelectedTier}
                    labelledBy="Select"
                    hasSelectAll={false}
                />
            </div>
            <div className="mb-2">
                <MultiSelect
                    options={teams}
                    value={selectedTeam}
                    onChange={setSelectedTeam}
                    labelledBy="Select"
                    hasSelectAll={false}
                />
            </div>
            <div className="mb-2">
                <MultiSelect
                    options={divisions}
                    value={selectedDivision}
                    onChange={setSelectedDivision}
                    labelledBy="Select"
                    hasSelectAll={false}
                />
            </div>
            <div className="mb-2">
                <MultiSelect
                    options={leagues}
                    value={selectedLeague}
                    onChange={setSelectedLeague}
                    labelledBy="Select"
                    hasSelectAll={false}
                />
            </div>
        </div>
    )

}