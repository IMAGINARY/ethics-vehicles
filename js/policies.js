const HUMANIST_ID = 'humanist';
const PROFIT_ID = 'profit';
const PROTECTOR_ID = 'protector';

const Policies = {};
Policies[HUMANIST_ID] = {
    name : "Humanist",
    objective : "Minimize human injuries"};
    
Policies[PROFIT_ID] = {
    name : "Profit-based",
    objective : "Minimize costs (property and insurance)"};

Policies[PROTECTOR_ID] = {
    name : "Protector",
    objective : "Protect the autonomous car and its passengers"}
