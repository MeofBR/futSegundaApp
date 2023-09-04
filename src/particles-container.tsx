import * as React from 'react';
import Particles from 'react-particles';
import type {
  Container,
  Engine,
  IOptions,
  RecursivePartial,
} from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

interface IProps {
  options: RecursivePartial<IOptions>;
}

class ParticlesContainer extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);

    this.particlesInit = this.particlesInit.bind(this);
    this.particlesLoaded = this.particlesLoaded.bind(this);
  }

  async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);
  }

  async particlesLoaded(container?: Container): Promise<void> {
    console.log(container);
  }

  render() {
    return (
      <Particles
        options={{
          background: {
            color: {
              value: '#0D0E12',
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onHover: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 50,
                duration: 0.8,
              },
            },
          },
          particles: {
            color: {
              value: '#672B9C',
            },
            links: {
              color: '#672B9C',
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 1,
              straight: true,
            },
            number: {
              value: 100,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        className="frame-layout__particles"
        init={this.particlesInit}
        loaded={this.particlesLoaded}
      />
    );
  }
}

export default ParticlesContainer;
