'use strict'

const e = React.createElement

const RetrieveButton = ({onClick, section}) => {
	return e('button', { onClick: onClick, className: section == "showAll" ? 'button_selected' : 'button' }, 'Show All' )
}  

const GetCompanySection = ({ companyData, putter, setters, currentValues }) => {
	return e ('div', {key: "getcopsec"}, [
		e( 'div', null, companyData == null ? null : e(CompanyDetails, { C: companyData.C, Owners: companyData.Owners, Subsidiaries: companyData.Subsidiaries, putter: putter, setters: setters, currentValues: currentValues}, null))
	])
}

const CompanyDetails = ({C, Subsidiaries, Owners, putter, setters, currentValues }) => {
	return e('div', null, [
		e(CompanyCardWithInput, { values: C, subs: Subsidiaries, ows: Owners, putter: putter, setters: setters, currentValues: currentValues }, null),
		e('div', {className: "companyCard"}, [
			e(CompanyRowTitle, {labelName: "Subsidiaries", labelValue: ""}, null),
			e('div', null, Subsidiaries == null ? null : Subsidiaries.map(o => e(CompanyRowTextWithButton, {labelName: "ID", labelValue: o.Owned.Id}, null) )),
			e(CompanyRowEmptyRow, null, null),
			e(CompanyRowTitle, {labelName: "Owners", labelValue: ""}, null),
			e('div', null, Owners == null ? null : Owners.map(o => e(CompanyRowTextWithButton, {labelName: "ID", labelValue: o.Owned.Id}, null) )),
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

const CompanyRowText = ({rowID, labelName, labelValue}) => {
	return e( 'div', { className: "row", key: rowID }, [
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

const CompanyRowTextWithButton = ({rowID, labelName, labelValue}) => {
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

const CompanyRowInput = ({rowID, labelName, labelValue, setter}) => {
	return e( 'div', { className: "row", key: rowID }, [
				e( 'div', { className: "label", key: "l" }, labelName),
				e( 'input', { type: 'text', defaultValue: labelValue, className: "info", key: "in", onChange: setter }, null)
	])
}

const CompanyCard = ({values}) => {
	return e( 'div', { className: "companyCard"}, [
		e( CompanyRowText, {rowID: "i", labelName: "ID", labelValue: values.Id}, null),
		e( CompanyRowText, {rowID: "n", labelName: "Name", labelValue: values.Name}, null),
	])
}

const CompanyCardWithInput = ({values, subs, ows, putter, setters, currentValues}) => {

	var nameValue = values.Name

	return e( 'div', { className: "companyCard"}, [
		e( CompanyRowTitle, {rowID: "k", labelName: "Company", labelValue: ""}, null),
		e( CompanyRowText, {rowID: "i", labelName: "ID", labelValue: values.Id}, null),
		e( CompanyRowInput, {rowID: "n", labelName: "Name", labelValue: values.Name, setter: setters.namer}, null),
		e( CompanyRowInput, {rowID: "a", labelName: "City", labelValue: values.City, setter: setters.citter}, null),
		e( CompanyRowInput, {rowID: "c", labelName: "Address", labelValue: values.Address, setter: setters.adder}, null),
		e( CompanyRowInput, {rowID: "e", labelName: "Email", labelValue: values.Email, setter: setters.emailer}, null),

		e( 'button', { className: "delete_button", key: "sdfsdf", onClick: ( () => putter("company/"+values.Id, currentValues)), style: {width: "-webkit-fill-available", height: "26px"} }, "Save")

	])
}

const Section = ({selection, companyData, fetcherFunction, putter, setters, currentValues }) => {
		if ( selection == 'get' ) {
			return e(GetCompanySection, { key: "getcop", companyData: companyData, putter: putter, setters: setters, currentValues: currentValues}, null);
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
		id: "",
		name: "",
		address: "",
		city: "",
		email: "",
    };

	nameSetter = event => {
		this.setState({ name: event.target.value })
	}
	addressSetter = event => {
		this.setState({ address: event.target.value })
	}
	citySetter = event => {
		this.setState({ city: event.target.value })
	}
	emailSetter = event => {
		this.setState({ email: event.target.value })
	}

	setters = {
		namer: this.nameSetter,
		adder: this.addressSetter,
		citter: this.citySetter,
		emailer: this.emailSetter,
	}

	fetcher = modifier => {
		return fetch('http://localhost:10000/' + modifier)
					.then(res => res.json())
					.then((data) => {
						this.setState({ companyData: data })
						console.log(this.state)
					})
					.catch(console.log);
	}

	putter = (modifier, newValues) => {

		var requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				Id: newValues.id,
				Name: newValues.name,
				City: newValues.city,
				Address: newValues.address,
				email: newValues.email,
			})
		}

		console.log(requestOptions)
		fetch('http://localhost:10000/' + modifier, requestOptions)
			.then(response => response.json())
			.then((data) => {})
			.catch(console.log);
	}

	getSingleCompany = modifier => {


		this.setState({section: "get", companyData: null})
		fetch('http://localhost:10000/company/' + modifier)
					.then(res => res.json())
					.then((data) => {
						console.log("here's your data bitch")
						console.log(data)
						this.setState({
							companyData:	data,
							name: 			data.C.Name,
							id:				data.C.Id,
							address:		data.C.Address,
							city:			data.C.City,
							email:			data.C.Email

						})
					})
					.catch(console.log);
		

	}
	
	render() {
		return e( 'div', { className: 'content' }, [
			e( 'div', { className: 'panel panel_left', key: "lefty" }, [
				e('div', { className: 'buttons' }, [
					e( 'input', { key: "inpu", type: 'text', onKeyDown: event => {(event.key === 'Enter' ? this.getSingleCompany(event.target.value) : null)}, className: 'button', placeholder: "Search by ID..." }, null),
					e( 'button', { key: "dude", className: 'button'}, 'Add Company'),
				]),
			]),
			e( 'div', { className: 'panel', key: "righty" }, [
				e(Section, { key: 'section', companyData: this.state.companyData, selection: this.state.section, putter: this.putter, setters: this.setters, currentValues: this.state}, null)
			])
		])
	}
}
const domContainer = document.querySelector('#create_company_button_container');
ReactDOM.render( e( Client ), domContainer );
