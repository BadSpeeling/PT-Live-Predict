import * as React from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { Team } from '../types'
import { AppContext } from "./AppContext";

export const PtCardListFilter = () => {

    const { selectedTeam, setSelectedTeam } = React.useContext(AppContext);

    const teams = [...Array(30).keys()].map((enumIndex) => {
        return {
            label: Team[enumIndex],
            value: Team[enumIndex],
        }
    })

    return (
        <div>
            <div className="mb-2">
                <div>Team</div>
                <div className="w-2/5 cursor-pointer">
                    <MultiSelect
                        options={teams}
                        value={selectedTeam}
                        onChange={setSelectedTeam}
                        labelledBy="Select"
                        hasSelectAll={false}
                        
                    />
                </div>
            </div>
        </div>
    )

}