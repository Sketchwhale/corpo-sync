'use strict'

const e = React.createElement

const RetrieveButton = ({onClick, section}) => {
	return e('button', { onClick: onClick, className: section == "showAll" ? 'button_selected' : 'button' }, 'Show All' )
}  

const GetCompanySection = ({ companyData }) => {
	return e ('div', {key: "getcopsec"}, [
		e( 'div', null, companyData == null ? null : e(CompanyDetails, { C: companyData.C, Owners: companyData.Owners, Subsidiaries: companyData.Subsidiaries }, null))
	])
}

const CompanyDetails = ({C, Subsidiaries, Owners}) => {
	return e('div', null, [
		e(CompanyCard, { values: C }, null),
		e('div', {className: "companyCard"}, [
			e(CompanyRowTitle, {labelName: "Subsidiaries", labelValue: ""}, null),
			e('div', null, Subsidiaries == null ? null : Subsidiaries.map(o => e(CompanyRowText, {labelName: "ID", labelValue: o.Owned.Id}, null) )),
			e(CompanyRowEmptyRow, null, null),
			e(CompanyRowTitle, {labelName: "Owners", labelValue: ""}, null),
			e('div', null, Owners == null ? null : Owners.map(o => e(CompanyRowText, {labelName: "ID", labelValue: o.Owned.Id}, null) )),
			e(AddOwnerbutton, {labelName: "Add Beneficial Owner", labelValue: ""}, null),
		])
	])
}

const AddOwnerbutton = ({rowID, labelName, labelValue}) => {
	return e( 'button', { className: "delete_button", key: rowID, style: {width: "-webkit-fill-available", height: "26px"} }, [
				e( 'div', { className: "label", key: "l" }, labelName),
				e( 'div' , {className: "info_plus_button" }, [
					e( 'div', { className: "info_text", key: "in" }, labelValue),
				])
	])
}

const CompanyRowTitle = ({rowID, labelName, labelValue}) => {
	return e( 'div', { className: "rowTitle", key: rowID }, [
				e( 'div', { className: "label", key: "l" }, labelName),
				e( 'div' , {className: "info_plus_button" }, [
					e( 'div', { className: "info_text", key: "in" }, labelValue),
				])
	])
}

const CompanyRowText = ({rowID, labelName, labelValue}) => {
	return e( 'div', { className: "row", key: rowID }, [
				e( 'div', { className: "label", key: "l" }, labelName),
				e( 'div' , {className: "info_plus_button" }, [
					e( 'div', { className: "info_text", key: "in" }, labelValue),
					e( 'button', { className: "delete_button", key: "dsd" }, "X"),
				])
	])
}

const CompanyRowEmptyRow = ({rowID, labelName, labelValue}) => {
	return e( 'div', { className: "rowEmpty", key: rowID }, [
	])

}

const CompanyRowInput = ({rowID, labelName, labelValue}) => {
	return e( 'div', { className: "row", key: rowID }, [
				e( 'div', { className: "label", key: "l" }, labelName),
				e( 'input', { type: 'text', placeholder: labelValue, className: "info", key: "in" }, null)
	])

}

const CompanyCard = ({values}) => {
	return e( 'div', { className: "companyCard"}, [
		e( CompanyRowTitle, {rowID: "k", labelName: "Company", labelValue: ""}, null),
		e( CompanyRowInput, {rowID: "i", labelName: "ID", labelValue: values.Id}, null),
		e( CompanyRowInput, {rowID: "n", labelName: "Name", labelValue: values.Name}, null),
		e( CompanyRowInput, {rowID: "a", labelName: "City", labelValue: values.City}, null),
		e( CompanyRowInput, {rowID: "c", labelName: "Address", labelValue: values.Address}, null),
		e( CompanyRowInput, {rowID: "e", labelName: "Email", labelValue: values.Email}, null),
	])
}

const Section = ({selection, companyData, fetcherFunction}) => {
		if ( selection == 'get' ) {
			return e(GetCompanySection, { key: "getcop", companyData: companyData }, null);
		}
		if ( selection == 'showAll' ) {
			return e(AllInfo, { key: "allinf", companyData: companyData }, null);
		}
		return null
	}

const AllInfo = ({companyData}) => { return e( 'div', null, companyData == null ? null : companyData.AllCompanies.map (ac =>
	e(CompanyCard, { values: ac }, null)))
}

class Client extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			companyData: null,
			section: "showAll", 
		};
		this.fetcher( "all" )
	}

	state = {
        companyData: null,
		section: "", 
    };

	fetcher = modifier => {
		fetch('http://localhost:10000/' + modifier)
					.then(res => res.json())
					.then((data) => {
						this.setState({ companyData: data })
					})
					.catch(console.log);
	}

	getSingleCompany = modifier => {

		this.setState({section: "get", companyData: null})
		this.fetcher(modifier)

	}
	
	render() {
		return e( 'div', { className: 'content' }, [
			e( 'div', { className: 'panel panel_left', key: "lefty" }, [
				e('div', { className: 'buttons' }, [
					e( 'input', { key: "inpu", type: 'text', onKeyDown: event => {(event.key === 'Enter' ? this.getSingleCompany("company/"+event.target.value) : null)}, className: 'button', placeholder: "Search by ID..." }, null),
					e( 'button', { key: "dude", className: 'button'}, 'Add Company'),
				]),
			]),
			e( 'div', { className: 'panel', key: "righty" }, [
				e(Section, { key: 'section', companyData: this.state.companyData, selection: this.state.section }, null)
			])
		])
	}
}
const domContainer = document.querySelector('#create_company_button_container');
ReactDOM.render( e( Client ), domContainer );
