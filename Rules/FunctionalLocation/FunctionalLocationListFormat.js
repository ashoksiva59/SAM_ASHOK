import planningPlant from './FormatPlanningPlant';
import location from './FormatLocation';
import workcenter from './FormatWorkCenter';
export default function FunctionalLocationListFormat(context) {
    var property = context.getProperty();
    var value = '-';
    switch (property) {
        case 'Subhead':
        return planningPlant(context).then(plant => {
            let result = plant;
            if (plant === '-') {
                return  value;  
            } else {
                return workcenter(context).then(center => {
                    if (center === '-') {
                        return  result;  
                    } else {
                        return  result + ', ' + center;
                    }
                });
            }
        });
        case 'Footnote':
            return location(context).then(loc => {
                if (loc === '-') {
                    return  context.binding.FuncLocIdIntern; 
                } else {
                    return  context.binding.FuncLocIdIntern + ', ' + loc; 
                }
            });
        default:
            return value;
    }
}

