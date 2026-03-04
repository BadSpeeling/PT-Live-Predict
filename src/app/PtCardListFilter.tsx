import * as React from 'react';
import Select from 'react-select';
import { CallServer, Team, Tier } from '../types'
import { AppContext } from "./AppContext";

export const PtCardListFilter = () => {

    const context = React.useContext(AppContext);

    const onSelectedTeamChange = (newValue: any) => {
        context.setPtCardFilters({
            ...context.ptCardFilters,
            selectedTeam: newValue,
        });
        context.setCallServer(CallServer.GetPtCards);
        context.setCardPage({
            ...context.cardPage,
            PageSize: 10,
            CurrentPage: 1,
            NavigationDirection: null,
        })
    }

    const onSelectedTierChange = (newValue: any) => {
        context.setPtCardFilters({
            ...context.ptCardFilters,
            selectedTier: newValue,
        });
        context.setCallServer(CallServer.GetPtCardsResult);
        context.setCardPage({
            ...context.cardPage,
            PageSize: 20,
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

    const tiers = [...Array(6).keys()].map((enumIndex) => {
        return {
            label: Tier[enumIndex],
            value: Tier[enumIndex],
        }
    })

    return (
        <div className="border p-4">
            <div className="mb-2">
                <div>Team</div>
                <div className="lg:w-2/5 cursor-pointer">
                    <Select
                        options={teams}
                        value={context.ptCardFilters.selectedTeam}
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
                <div>Tier</div>
                <div className="lg:w-2/5 cursor-pointer">
                    <Select
                        options={tiers}
                        value={context.ptCardFilters.selectedTier}
                        onChange={onSelectedTierChange}   
                        instanceId={"selectedTier"}
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