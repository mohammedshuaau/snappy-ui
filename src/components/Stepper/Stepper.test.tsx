import {render, screen} from '@testing-library/react';
import {Stepper} from './Stepper';

const mockSteps = [
  {
    label: 'Step 1',
    description: 'First step',
  },
  {
    label: 'Step 2',
    description: 'Second step',
  },
  {
    label: 'Step 3',
    description: 'Third step',
  },
];

describe('Stepper', () => {
  it('renders with default props', () => {
    render(
      <Stepper
        steps={mockSteps}
        activeStep={0}
      />
    );
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('First step')).toBeInTheDocument();
  });

  it('shows step numbers by default', () => {
    render(
      <Stepper
        steps={mockSteps}
        activeStep={0}
        showStepNumbers
      />
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('marks steps as completed correctly', () => {
    render(
      <Stepper
        steps={mockSteps}
        activeStep={1}
      />
    );
    
    // First step should be completed
    const stepContainer = screen.getByText('Step 1').closest('div[class*="relative"]');
    const stepIndicator = stepContainer?.querySelector('div[class*="bg-primary-600"]');
    expect(stepIndicator).toBeInTheDocument();
  });

  it('marks current step correctly', () => {
    render(
      <Stepper
        steps={mockSteps}
        activeStep={1}
      />
    );
    
    const stepContainer = screen.getByText('Step 2').closest('div[class*="relative"]');
    const stepIndicator = stepContainer?.querySelector('div[aria-current="step"]');
    expect(stepIndicator).toBeInTheDocument();
  });

  it('renders custom icons', () => {
    const stepsWithIcons = [
      {
        label: 'Custom Icon',
        icon: <span data-testid="custom-icon">🎯</span>,
      },
    ];

    render(
      <Stepper
        steps={stepsWithIcons}
        activeStep={0}
      />
    );
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders in vertical orientation', () => {
    render(
      <Stepper
        steps={mockSteps}
        activeStep={0}
        variant="vertical"
      />
    );
    
    const stepper = screen.getByText('Step 1').closest('div[class*="stepper-"]');
    expect(stepper).toHaveClass('flex-col');
  });

  it('shows step content in vertical variant', () => {
    const stepsWithContent = [
      {
        label: 'Step 1',
        content: <div>Step 1 content</div>,
      },
    ];

    render(
      <Stepper
        steps={stepsWithContent}
        activeStep={0}
        variant="vertical"
      />
    );
    
    expect(screen.getByText('Step 1 content')).toBeInTheDocument();
  });

  it('applies different sizes', () => {
    const { rerender } = render(
      <Stepper
        steps={mockSteps}
        activeStep={0}
        size="sm"
      />
    );
    const stepper = screen.getByText('Step 1').closest('div[class*="stepper-"]');
    expect(stepper).toHaveClass('text-sm');

    rerender(
      <Stepper
        steps={mockSteps}
        activeStep={0}
        size="lg"
      />
    );
    expect(stepper).toHaveClass('text-lg');
  });
}); 