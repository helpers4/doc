import React from 'react';
import Layout from '@theme/Layout';

export default function Comparison(): JSX.Element {
  return (
    <Layout
      title="Comparison"
      description="Compare Helpers4 with other utility libraries">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>Library Comparison</h1>

            <p>
              Helpers4 stands out from other utility libraries with its focus on TypeScript-first development,
              tree-shaking optimization, and comprehensive testing.
            </p>

            <h2>Feature Comparison</h2>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Helpers4</th>
                    <th>Lodash</th>
                    <th>Ramda</th>
                    <th>Radashi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TypeScript Support</td>
                    <td>✅ Built-in</td>
                    <td>⚠️ @types package</td>
                    <td>⚠️ @types package</td>
                    <td>✅ Built-in</td>
                  </tr>
                  <tr>
                    <td>Tree Shaking</td>
                    <td>✅ Optimized</td>
                    <td>⚠️ Manual imports</td>
                    <td>✅ ES modules</td>
                    <td>✅ ES modules</td>
                  </tr>
                  <tr>
                    <td>Bundle Size</td>
                    <td>✅ Minimal</td>
                    <td>❌ Large</td>
                    <td>⚠️ Medium</td>
                    <td>✅ Small</td>
                  </tr>
                  <tr>
                    <td>Functional Programming</td>
                    <td>⚠️ Partial</td>
                    <td>⚠️ Partial</td>
                    <td>✅ Full</td>
                    <td>⚠️ Partial</td>
                  </tr>
                  <tr>
                    <td>Performance</td>
                    <td>✅ Optimized</td>
                    <td>✅ Good</td>
                    <td>⚠️ Fair</td>
                    <td>✅ Good</td>
                  </tr>
                  <tr>
                    <td>Documentation</td>
                    <td>✅ Comprehensive</td>
                    <td>✅ Excellent</td>
                    <td>✅ Good</td>
                    <td>⚠️ Growing</td>
                  </tr>
                  <tr>
                    <td>Active Development</td>
                    <td>✅ Active</td>
                    <td>⚠️ Maintenance</td>
                    <td>✅ Active</td>
                    <td>✅ Active</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Why Choose Helpers4?</h2>

            <div className="row margin-top--lg">
              <div className="col col--6">
                <h3>🎯 Purpose-Built</h3>
                <p>
                  Designed specifically for modern TypeScript/JavaScript applications with
                  first-class type safety and IntelliSense support.
                </p>
              </div>
              <div className="col col--6">
                <h3>📦 Bundle Optimized</h3>
                <p>
                  Each helper is independently importable, ensuring your bundle only includes
                  what you actually use.
                </p>
              </div>
            </div>

            <div className="row margin-top--md">
              <div className="col col--6">
                <h3>🧪 Thoroughly Tested</h3>
                <p>
                  Every function comes with comprehensive tests and examples, ensuring
                  reliability in production environments.
                </p>
              </div>
              <div className="col col--6">
                <h3>🚀 Modern Standards</h3>
                <p>
                  Built with modern JavaScript features and follows current best practices
                  for library development.
                </p>
              </div>
            </div>

            <h2>Migration Guide</h2>

            <h3>From Lodash</h3>
            <div className="language-diff">
              <pre>
                <code>
                  {`// Before (Lodash)
import { chunk, debounce } from 'lodash';

// After (Helpers4)
import { chunk } from '@helpers4/array';
import { debounce } from '@helpers4/function';`}
                </code>
              </pre>
            </div>

            <h3>From Ramda</h3>
            <div className="language-diff">
              <pre>
                <code>
                  {`// Before (Ramda)
import * as R from 'ramda';
const chunked = R.splitEvery(3, data);

// After (Helpers4)
import { chunk } from '@helpers4/array';
const chunked = chunk(data, 3);`}
                </code>
              </pre>
            </div>

            <div className="alert alert--info margin-top--lg">
              <strong>💡 Pro Tip:</strong> You can gradually migrate by installing Helpers4 alongside
              your existing utility library and replacing functions one by one.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
