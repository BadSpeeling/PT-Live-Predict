import * as React from 'react';
import Select from 'react-select';
import { CallServer, Team } from '../types'
import { AppContext } from "./AppContext";

export const PtCardListFilter = () => {

    const context = React.useContext(AppContext);

    const onSelectedTeamChange = (newValue: any) => {
        context.setSelectedTeam(newValue);
        context.setCallServer(CallServer.GetPtCards);
        context.setCardPage({
            ...context.cardPage,
            CurrentPage: 1,
            NavigationDirection: null,
        })
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
                        value={context.selectedTeam}
                        onChange={onSelectedTeamChange}   
                        instanceId={"selectedTeam"}
                        styles={{
                            "menu": (baseStyles, state) => ({
                                ...baseStyles,
                                paddingBottom: "10px"
                            })
                        }}             
                    />
                </div>
            </div>
        </div>
    )

}