import _ from 'lodash';
import { Box } from 'grommet';
import PropTypes from 'prop-types';
import StepperActions from './Actions';
import React, { Component } from 'react';

/**
 * Stepper
 * Dara una lista de childrens vamos a renderizar cada uno en el orden dado,
 * cada paso provee los elementos para su ejecucion y submition event.
 */

/**
 * ==========================================================================
 *                              !Warning!
 * Este componente solo se ocupa del control de steps, no de validar
 * ni menos aun del control de el step en si.
 * ==========================================================================
 *
 */

/**
 *  ==========================================================================
 *                           Como se Utiliza ?
 *  ==========================================================================
 *
 *  - Crear un Form Formik (sin control = botones)
 *  - Inyectar el bind al componente:
 *    El bind permite generar un trigger submition desde fuera del componente
 *    va a ser usado en caso de que el componente no disponga un ActionComponente
 *       bindSubmitForm(submitForm, isSubmitting);
 *  - En el momento de guardar utilizar el evento onFormSubmited() por props.
 *       this.props.onFormSubmited();
 *
 */

class StepperContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      open: false,
      isSubmitting: false,
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.currentStep = this.currentStep.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.bindSubmitForm = this.bindSubmitForm.bind(this);
  }

  // mantiene referencia directa con el evento de submittion
  submitForm = null;
  isSubmiting = null;

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleCancel() {
    this.setState({ open: false });
    this.props.history.push('/');
  }

  next() {
    const childrenArray = React.Children.toArray(this.props.children);
    const lastPage = this.state.step === childrenArray.length - 1;
    if (lastPage) {
      this.props.lastStepAction();
    } else {
      // prevenir next si el largo de children es superado
      this.setState(state => ({
        step: _.min([state.step + 1, this.props.children.length - 1]),
      }));
    }
  }

  // va a triggerear el evento de submition del children
  handleSubmit() {
    this.submitForm();
  }

  previous() {
    // prevenir navegacion previa si el step es menor a 0
    this.setState(state => ({
      step: _.max([state.step - 1, 0]),
    }));
  }

  bindSubmitForm(submitForm, isSubmitting) {
    this.submitForm = submitForm;
    this.isSubmitting = isSubmitting;
  }

  currentStep() {
    const childrenArray = React.Children.toArray(this.props.children);
    return {
      isLastPage: this.state.step === childrenArray.length - 1,
      activePage: React.cloneElement(childrenArray[this.state.step], {
        bindSubmitForm: this.bindSubmitForm,
        onFormSubmited: this.next,
      }),
    };
  }

  render() {
    const { classes } = this.props;
    const { header: Header } = this.props;
    const { step } = this.state;
    const { isLastPage, activePage } = this.currentStep();
    return (
      <Box flex fill>
        <Header />
        <Box flex fill>
          {activePage}
          <StepperActions
            step={step}
            classes={classes}
            isLastPage={isLastPage}
            next={this.handleSubmit}
            previous={this.previous}
            handleOpen={this.handleOpen}
            isSubmitting={this.isSubmitting}
          />
        </Box>
      </Box>
    );
  }
}

StepperContainer.propTypes = {
  history: PropTypes.object.isRequired,
  lastStepAction: PropTypes.func.isRequired,
};

export default StepperContainer;
