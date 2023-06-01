import { useImmer } from 'use-immer';
import React, { useState } from 'react';

import "./Builder.css";

export default function Builder() {
    
    const [missionPlan, updateMissionPlan] = useImmer({
            name: "New Mission Plan",
            phases: [],
            environment: {},
        });
    
    const addPhase = () => {
        const newId = missionPlan.phases.length > 0 ? missionPlan.phases[missionPlan.phases.length - 1].id + 1 : 1;
        
        const newPhase = {
            id: newId,
            name : `Phase ${newId}`,
            ensembles: [],
        };

        updateMissionPlan(draft => {
            draft.phases.push(newPhase);
        })
    }
    
    const addEnsemble = (phase) => {
        const newId = phase.ensembles.length > 0 ? phase.ensembles[phase.ensembles.length - 1].id + 1 : 1;

        const newEnsemble = {
            id: newId,
            name : `Ensemble ${newId}`,
            pingConfigurations: [],
        };

        updateMissionPlan(draft => {
            let index = draft.phases.findIndex(p => p.id == phase.id);
            draft.phases[index].ensembles.push(newEnsemble);
        })

    };
    
    const addPingConfiguration = (phase, ensemble) => {
        const newId = ensemble.pingConfigurations.length > 0 ? ensemble.pingConfigurations[ensemble.pingConfigurations.length - 1].id + 1 : 1;

        const newPingConfiguration = {
            id: newId,
            name : `Ping configuration ${newId}`,
            attributes: {
                power: null,
                mode: null,
                range: null,
            }
        };

        updateMissionPlan(draft => {
            let phaseIndex = draft.phases.findIndex(p => p.id == phase.id);
            let ensembleIndex = draft.phases[phaseIndex].ensembles.findIndex(e => e.id == ensemble.id);

            draft.phases[phaseIndex].ensembles[ensembleIndex].pingConfigurations.push(newPingConfiguration);
        })
    }

    return (
        <div style={{"padding": "20px", "maxWidth": "750px"}}>
            {missionPlan.phases.map(phase => (
            <ul key={phase.id} style={{"listStyleType": "none", "borderLeft": "30px solid #BEBEBE", "textAlign" : "left", "paddingLeft" : "0"}}>
                <li style={{"height" : "40px", "backgroundColor": "#BEBEBE", "padding" : "0", "margin": "0"}}>
                    <div style={{"display": "flex", "justifyContent": "start", "paddingTop" : "10px"}}>
                        <label>{phase.name} | </label>
                        <label> Start </label><input type="date" style={{"marginRight":"10px"}}/>
                        <label> End </label><input type="date" />
                    </div>
                </li>
                <li>
                    {phase.ensembles.map(ensemble => (
                        <ul key={ensemble.id} style={{"listStyleType": "none", "borderLeft": "30px solid #696969", "textAlign" : "left", "paddingLeft" : "0", "marginBottom": "10px"}}>
                            <li style={{"height" : "40px", "backgroundColor": "#696969", "padding" : "0", "margin": "0"}}>
                                <div style={{"display": "flex", "justifyContent": "start", "paddingTop" : "10px"}}>
                                    <label>{ensemble.name} | </label>
                                    <label> Iterations </label> <input type="number" style={{"marginRight":"10px"}}/>
                                    <label> Timespan </label> <input type="text" />
                                </div>
                            </li>
                            {ensemble.pingConfigurations.map(pingConfiguration => (
                                <ul key={pingConfiguration.id} style={{"listStyleType": "none", "borderLeft": "30px solid #383838", "textAlign" : "left", "paddingLeft" : "0", "marginBottom": "10px"}}>
                                    <li style={{"height" : "40px", "backgroundColor": "#383838", "padding" : "0", "margin": "0"}}> <label>{pingConfiguration.name} </label></li>
                                        <li style={{"padding": "2px"}}><label className="text-black">Power</label><input type="text" /></li>
                                        <li style={{"padding": "2px"}}><label className="text-black">Mode</label><input type="text" /></li>
                                        <li style={{"padding": "2px"}}><label className="text-black">Range</label><input type="text" /></li>
                                    <li style={{"height" : "30px", "backgroundColor": "#383838", "margin": "0"}}></li>
                                </ul>
                            ))}
                            <li style={{"paddingBottom": "10px", "paddingLeft": "10px"}}>
                                <button onClick={() => addPingConfiguration(phase, ensemble)}>
                                    Add ping configuration
                                </button>
                            </li>
                            <li style={{"height" : "30px", "backgroundColor": "#696969", "margin": "0"}}>                    

                            </li>
                        </ul>
                    ))}
                </li>
                <li style={{"paddingBottom": "10px", "paddingLeft": "10px", "paddingTop" : "10px"}}>
                    <button onClick={() => addEnsemble(phase)}>
                        Add ensemble
                    </button>
                </li>
                <li style={{"height" : "30px", "backgroundColor": "#BEBEBE", "margin": "0"}}>                    

                </li>
            </ul>
            ))}
            <button onClick={() => addPhase()}>
                Add phase
            </button>
        </div>
    )
}