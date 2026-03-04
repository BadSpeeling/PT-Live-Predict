import * as React from 'react';
import Select from 'react-select';
import { CallServer, Team, Tier } from '../types'
import { AppContext } from "./AppContext";
import { toast } from 'react-toastify';

export const PtCardListFilter = () => {

    const context = React.useContext(AppContext);

    const onSelectedTeamChange = (newValue: any) => {
        context.setPtCardFilters({
            ...context.ptCardFilters,
            selectedTeam: newValue,
            selectedTier: {label: '', value: ''},
            enteredName: {
                FirstName: '',
                LastName: '',
            },
        });
    }

    const onSelectedTierChange = (newValue: any) => {
        context.setPtCardFilters({
            ...context.ptCardFilters,
            selectedTier: newValue,
            selectedTeam: {label: '', value: ''},
            enteredName: {
                FirstName: '',
                LastName: '',
            },            
        });
    }

    const onFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        context.setPtCardFilters({
            ...context.ptCardFilters,
            enteredName: {
                ...context.ptCardFilters.enteredName,
                FirstName: e.target.value,
            },
            selectedTier: {label: '', value: ''},
            selectedTeam: {label: '', value: ''},
        });
    }

    const onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        context.setPtCardFilters({
            ...context.ptCardFilters,
            enteredName: {
                ...context.ptCardFilters.enteredName,
                LastName: e.target.value,
            },
            selectedTier: {label: '', value: ''},
            selectedTeam: {label: '', value: ''},
        });
    }

    const onFilterSubmit = () => {

        const firstNameEntered = context.ptCardFilters.enteredName.FirstName !== '';
        const lastNameEntered = context.ptCardFilters.enteredName.LastName !== '';

        if ((firstNameEntered && !lastNameEntered) || (!firstNameEntered && lastNameEntered)) {
            toast("Both First and Last Name must be entered!");
            return;
        }

        if (!(firstNameEntered && lastNameEntered) && !context.ptCardFilters.selectedTeam.value && !context.ptCardFilters.selectedTier.value) {
            toast("A filter must be selected!");
            return;            
        }

        context.setCallServer(CallServer.GetPtCardsResult);
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

    const tiers = [...Object.keys(Tier)].map((enumValue) => {
        return {
            label: enumValue,
            value: enumValue,
        }
    })

    return (
        <div className="border p-4">
                <div className="mb-1">
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
                </div>
                <div className="mb-1">
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
                <div className="mb-1">
                    <div className="inline-block">
                        <div>First Name</div>
                        <div className="lg:w-2/5">
                            <input className="filter-border cursor-pointer" value={context.ptCardFilters.enteredName.FirstName} onChange={onFirstNameChange} />
                        </div>
                    </div>
                    <div className="ml-1 inline-block">
                        <div>Last Name</div>
                        <div className="lg:w-2/5">
                            <input className="filter-border cursor-pointer" value={context.ptCardFilters.enteredName.LastName} onChange={onLastNameChange} />
                        </div>
                    </div>
                </div>
                <span className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer" onClick={onFilterSubmit}>Submit</span>
        </div>
    )

}