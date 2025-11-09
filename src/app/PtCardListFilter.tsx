import * as React from 'react';
import Select from 'react-select';
import { Team } from '../types'
import { AppContext } from "./AppContext";

export const PtCardListFilter = () => {

    const { selectedTeam, setSelectedTeam } = React.useContext(AppContext);

    const onSelectedTeamChange = (newValue: any) => {
        setSelectedTeam(newValue);
    }

    const teams = [...Array(30).keys()].map((enumIndex) => {
        return {
            label: Team[enumIndex],
            value: Team[enumIndex],
        }
    }) 

    return (
        <div className="border p-4">
            <div className="mb-2">
                <div>Team</div>
                <div className="lg:w-2/5 cursor-pointer">
                    <Select
                        options={teams}
                        value={selectedTeam}
                        onChange={onSelectedTeamChange}   
                        instanceId={"selectedTeam"}                     
                    />
                </div>
            </div>
        </div>
    )

}