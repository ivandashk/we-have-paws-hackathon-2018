import jsonQuery from 'json-query';
import nestedProperty from 'nested-property';
import jsonq from 'jsonq';
import data from './data.json';

function GetForgeIdByCoordinates(sector, row, seat) {
    var answer = nestedProperty.get(data,`sectors.${sector-1}.rows.${row-1}.seats.${seat-1}.forgeId.${1}`);
    return answer;
}

function GetCoordinatesByForgeId(argumentId) {
    var jsonQdata = jsonQ(data);
    var id = jsonQdata.find('forgeId', function() {
        if (this instanceof Array)
            return this[1] === argumentId;
    });
    if (id.length == 0) return;
    var path = id.path();
    var sector = parseInt(path[1]) + 1;
    var row = parseInt(path[3]) + 1;
    var seat = parseInt(path[5]) + 1;

    var answer = [sector, row, seat]
    return answer;
}

function GetRowsBySector(sector) {
    var answer = nestedProperty.get(data,`sectors.${sector-1}.rows`);
    var res = answer.map((item) => {
        return item.name;
    });
    return res;
}
function GetSitsBySectorAndRow(sector,row) {
    var answer = nestedProperty.get(data,`sectors.${sector-1}.rows.${row-1}.seats`);
    var res = answer.map((item) => {
        return item.name;
    });
    return res;
}
function GetAllSectors() {
    var answer = nestedProperty.set(data);
    var res = answer.sectors.map((item) => {
        return item.name;
    });
    return res;
}    

console.log(GetForgeIdByCoordinates(6, 2, 9));
console.log(GetCoordinatesByForgeId(6358));
console.log(GetAllSectors());
console.log(GetRowsBySector(6));
console.log(GetSitsBySectorAndRow(6, 2));

export {
    GetAllSectors, GetCoordinatesByForgeId, GetForgeIdByCoordinates, GetRowsBySector, GetSitsBySectorAndRow
}