import React, { Component } from 'react';
import SelectInput from './SelectInput';
import { GetSectors, GetRowsOnSector, GetSitsOnRow } from './Data'

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        let sectorsList = GetSectors();
        console.log('sectors', sectorsList);

        let rowsList = GetRowsOnSector(sectorsList[0]);
        console.log('rows', rowsList);

        let sitsList = GetSitsOnRow(sectorsList[0], rowsList[0]);
        console.log('sits', sitsList);

        this.state = { 
            sectors: sectorsList,
            rows: rowsList,
            sits: sitsList,
            selectedSector: ''
        }

        this.OnSectorSelected = this.OnSectorSelected.bind(this);
        this.OnRowSelected = this.OnRowSelected.bind(this);
    }

    OnSectorSelected(sector) {
        console.log('Attempt to change sector!', sector);

        let rowsList = GetRowsOnSector(sector);
        let sitsList = GetSitsOnRow(sector, rowsList[0]);
        
        this.setState({
            selectedSector: sector,
            rows: rowsList,
            sits: sitsList
        })
    }

    OnRowSelected(row) {
        console.log('Attempt to change row!', row);

        let sitsList = GetSitsOnRow(this.state.selectedSector, row);

        this.setState({
            sits: sitsList
        })
    }

    OnSeatSelected(seat) {

    }

    render() {
        return (
            <div>
                <legend>Сектор</legend>
                <SelectInput onOptionSelected={this.OnSectorSelected} options={this.state.sectors} />

                <legend>Ряд</legend>
                <SelectInput onOptionSelected={this.OnRowSelected} options={this.state.rows} />

                <legend>Место</legend>
                <SelectInput onOptionSelected={this.OnSeatSelected} options={this.state.sits} />
            </div>
        );
    }
}

export default NavigationBar;