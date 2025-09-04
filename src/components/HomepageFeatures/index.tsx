import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Tree-shaking Ready',
    Svg: require('@site/static/img/undraw_tree.svg').default,
    description: (
      <>
        Helpers4 is designed with tree-shaking in mind. Import only what you need
        and keep your bundle size minimal.
      </>
    ),
  },
  {
    title: 'TypeScript First',
    Svg: require('@site/static/img/undraw_typescript.svg').default,
    description: (
      <>
        Built with TypeScript, providing excellent type safety and IntelliSense
        support for better developer experience.
      </>
    ),
  },
  {
    title: 'Comprehensive Testing',
    Svg: require('@site/static/img/undraw_testing.svg').default,
    description: (
      <>
        Every helper function is thoroughly tested to ensure reliability and
        consistent behavior across different environments.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
