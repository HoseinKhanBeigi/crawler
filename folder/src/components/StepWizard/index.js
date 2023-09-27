/* eslint-disable react/jsx-no-bind */
import React, { useRef, useState } from 'react';
import { Steps } from 'antd';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.scss';

const { Step } = Steps;

const StepWizard = props => {
  const data = useRef({ current: null });
  const { title, steps, current, children, isPage, ...other } = props;
  const [currentStep, setCurrentStep] = useState(current);
  const ComponentName = steps[currentStep]?.component;
  const handleNextStep = value => {
    if (value) {
      data.current = { ...data.current, ...value };
    }
    setCurrentStep(prev => prev + 1);
  };
  return (
    <div className={isPage && s.container}>
      <div className={isPage && s.card}>
        {title && (
          <>
            <h2 className={s.title}>{title}</h2>
            <div className={s.hr} />
          </>
        )}
        {!steps[currentStep].isComplate && (
          <>
            <div className={s.steps}>
              <Steps size="small" labelPlacement="vertical">
                {steps.map(
                  ({ step }, i) =>
                    step && (
                      <Step
                        key={step.title}
                        {...step}
                        status={
                          currentStep > i
                            ? 'finish'
                            : currentStep === i
                            ? 'process'
                            : 'wait'
                        }
                      />
                    ),
                )}
              </Steps>
            </div>
            <div className={s.hr} />
          </>
        )}
        <div className={s.stepsComponent}>
          {ComponentName && (
            <ComponentName
              onBackStep={setCurrentStep.bind(null, prev => prev - 1)}
              onNextStep={handleNextStep}
              data={data}
              {...other}
            />
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
StepWizard.propTypes = {
  title: PropTypes.string,
  current: PropTypes.number,
  isPage: PropTypes.bool,
  steps: PropTypes.array,
  children: PropTypes.elementType.isRequired,
};
StepWizard.defaultProps = {
  title: '',
  current: 0,
  isPage: false,
  steps: [],
};
export default withStyles(s)(StepWizard);
