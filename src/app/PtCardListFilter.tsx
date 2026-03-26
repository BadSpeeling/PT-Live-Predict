import * as React from 'react';
import Select from 'react-select';
import { CallServer, GridMode, Team, Tier } from '../types'
import { liveUpdates } from '../types/data'
import { AppContext } from "./AppContext";
import { toast } from 'react-toastify';
import { dateToString } from './lib/pt-card-helper'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

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

    const onSelectedLiveUpdateChange = (newValue: any) => {
        context.setPtCardFilters({
            ...context.ptCardFilters,
            selectedLiveUpdate: newValue,
        });
    }

    const onFilterSubmit = () => {

        const getPageSize = () => {
            switch (context.pageState.GridMode) {
                case GridMode.PtCard:
                    return 10;
                case GridMode.ResultingTier:
                    return 20;
            }
        }

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

        context.setPageState({
            ...context.pageState,
            CallServer: CallServer.GetStandard,
        });
        context.setCardPage({
            ...context.cardPage,
            CurrentPage: 1,
            NavigationDirection: null,
            PageSize: getPageSize(),
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
            value: enumIndex.toString(),
        }
    })

    const liveUpdateOptions = liveUpdates.slice(0,-1).map((liveUpdate) => {
        return {
            label: `${dateToString(liveUpdate.EndDate!)}`,
            value: liveUpdate.LiveUpdateID.toString(),
        }
    })

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: '0'|'1',
    ) => {

        const getGridModeEnum = () => {
            switch (newAlignment) {
                case "0":
                    return GridMode.PtCard;
                case "1":
                    return GridMode.ResultingTier;
            }
        }

        const gridMode = getGridModeEnum();

        context.setPageState({
            ...context.pageState,
            GridMode: gridMode,
        })

    };

    return (
        <div className="border p-4">
            <div>
                <ToggleButtonGroup
                    value={context.pageState.GridMode.toString()}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                    >
                    <ToggleButton value="0">
                        Current Cards
                    </ToggleButton>
                    <ToggleButton value="1">
                        Past Updates
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
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
                        menuPlacement="top"                        
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
                        menuPlacement="top"           
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
            {
                context.pageState.GridMode === GridMode.ResultingTier && (<div className="mb-1">
                    <div>Live Update</div>
                    <div className="lg:w-2/5 cursor-pointer">
                        <Select
                            options={liveUpdateOptions}
                            value={context.ptCardFilters.selectedLiveUpdate}
                            onChange={onSelectedLiveUpdateChange}   
                            instanceId={"selectedLiveUpdate"}
                            styles={{
                                "menu": (baseStyles, state) => ({
                                    ...baseStyles,
                                    paddingBottom: "10px"
                                })
                            }}   
                            menuPlacement="top"                     
                        />
                    </div>
                </div>)
            }
            <span className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer" onClick={onFilterSubmit}>Submit</span>
        </div>
    )

}