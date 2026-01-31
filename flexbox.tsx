import { useState } from 'react';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
type AlignContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';

interface FlexboxState {
  flexDirection: FlexDirection;
  justifyContent: JustifyContent;
  alignItems: AlignItems;
  flexWrap: FlexWrap;
  alignContent: AlignContent;
  gap: number;
}

const FLEX_DIRECTIONS: FlexDirection[] = ['row', 'row-reverse', 'column', 'column-reverse'];
const JUSTIFY_CONTENT: JustifyContent[] = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'];
const ALIGN_ITEMS: AlignItems[] = ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'];
const FLEX_WRAP: FlexWrap[] = ['nowrap', 'wrap', 'wrap-reverse'];
const ALIGN_CONTENT: AlignContent[] = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'];

const ITEM_COLOR = '#6366f1';

export default function FlexboxExplainer() {
  const [state, setState] = useState<FlexboxState>({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    alignContent: 'stretch',
    gap: 16,
  });

  const [itemCount, setItemCount] = useState(4);

  const updateProperty = <K extends keyof FlexboxState>(property: K, value: FlexboxState[K]) => {
    setState(prev => ({ ...prev, [property]: value }));
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: state.flexDirection,
    justifyContent: state.justifyContent,
    alignItems: state.alignItems,
    flexWrap: state.flexWrap,
    alignContent: state.alignContent,
    gap: `${state.gap}px`,
    width: '100%',
    flex: 1,
    minHeight: '200px',
    background: '#f8f9fa',
    borderRadius: '4px',
    padding: '8px',
    border: '1px dashed #d1d5db',
    boxSizing: 'border-box',
  };

  const generateCSS = () => {
    return `.container {
  display: flex;
  flex-direction: ${state.flexDirection};
  justify-content: ${state.justifyContent};
  align-items: ${state.alignItems};
  flex-wrap: ${state.flexWrap};
  align-content: ${state.alignContent};
  gap: ${state.gap}px;
}`;
  };

  return (
    <div className="flexbox-explainer">
      <div className="explainer-layout">
        {/* Controls Panel */}
        <div className="controls-panel">
          <h3 className="panel-title">Flexbox Properties</h3>
          
          {/* flex-direction */}
          <div className="control-group">
            <label className="control-label">
              flex-direction:
              <span className="property-value">{state.flexDirection}</span>
            </label>
            <div className="button-group">
              {FLEX_DIRECTIONS.map(value => (
                <button
                  key={value}
                  className={`control-btn ${state.flexDirection === value ? 'active' : ''}`}
                  onClick={() => updateProperty('flexDirection', value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* justify-content */}
          <div className="control-group">
            <label className="control-label">
              justify-content:
              <span className="property-value">{state.justifyContent}</span>
            </label>
            <div className="button-group">
              {JUSTIFY_CONTENT.map(value => (
                <button
                  key={value}
                  className={`control-btn ${state.justifyContent === value ? 'active' : ''}`}
                  onClick={() => updateProperty('justifyContent', value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* align-items */}
          <div className="control-group">
            <label className="control-label">
              align-items:
              <span className="property-value">{state.alignItems}</span>
            </label>
            <div className="button-group">
              {ALIGN_ITEMS.map(value => (
                <button
                  key={value}
                  className={`control-btn ${state.alignItems === value ? 'active' : ''}`}
                  onClick={() => updateProperty('alignItems', value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* flex-wrap */}
          <div className="control-group">
            <label className="control-label">
              flex-wrap:
              <span className="property-value">{state.flexWrap}</span>
            </label>
            <div className="button-group">
              {FLEX_WRAP.map(value => (
                <button
                  key={value}
                  className={`control-btn ${state.flexWrap === value ? 'active' : ''}`}
                  onClick={() => updateProperty('flexWrap', value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* align-content */}
          <div className="control-group">
            <label className="control-label">
              align-content:
              <span className="property-value">{state.alignContent}</span>
            </label>
            <span className="hint">(needs wrap)</span>
            <div className="button-group">
              {ALIGN_CONTENT.map(value => (
                <button
                  key={value}
                  className={`control-btn ${state.alignContent === value ? 'active' : ''}`}
                  onClick={() => updateProperty('alignContent', value)}
                  disabled={state.flexWrap === 'nowrap'}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* gap */}
          <div className="control-group">
            <label className="control-label">
              gap:
              <span className="property-value">{state.gap}px</span>
            </label>
            <input
              type="range"
              min="0"
              max="32"
              value={state.gap}
              onChange={(e) => updateProperty('gap', parseInt(e.target.value))}
              className="range-slider"
            />
          </div>

          {/* Item count */}
          <div className="control-group">
            <label className="control-label">
              items:
              <span className="property-value">{itemCount}</span>
            </label>
            <div className="button-group">
              {[3, 4, 5, 6, 8, 10].map(count => (
                <button
                  key={count}
                  className={`control-btn ${itemCount === count ? 'active' : ''}`}
                  onClick={() => setItemCount(count)}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Preview Panel */}
        <div className="preview-panel">
          <h3 className="panel-title">Preview</h3>
          
          <div style={containerStyle} className="preview-container">
            {Array.from({ length: itemCount }, (_, i) => {
              const isColumn = state.flexDirection.includes('column');
              const isStretchHeight = state.alignItems === 'stretch' && !isColumn;
              const isStretchWidth = state.alignItems === 'stretch' && isColumn;
              
              return (
                <div
                  key={i}
                  className={`flex-item${isStretchHeight ? ' stretch-height' : ''}${isStretchWidth ? ' stretch-width' : ''}`}
                  style={{
                    backgroundColor: ITEM_COLOR,
                  }}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>
        </div>

        {/* CSS Panel - desktop */}
        <div className="css-panel desktop-only">
          <h3 className="panel-title">Generated CSS</h3>
          <pre className="css-code">{generateCSS()}</pre>
        </div>
      </div>

      {/* Generated CSS - mobile only (below everything) */}
      <div className="css-output mobile-only">
        <h4 className="css-title">Generated CSS</h4>
        <pre className="css-code">{generateCSS()}</pre>
      </div>

      <style>{`
        .flexbox-explainer {
          background: #ffffff;
          border-radius: 8px;
          padding: 12px;
          font-family: system-ui, -apple-system, sans-serif;
          border: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }

        .explainer-layout {
          display: grid;
          grid-template-columns: 260px 1fr 220px;
          gap: 12px;
          align-items: stretch;
        }

        .panel-title {
          font-size: 11px;
          font-weight: 600;
          color: #374151;
          margin: 0 0 10px 0;
          padding-bottom: 6px;
          border-bottom: 1px solid #e5e7eb;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .controls-panel {
          background: #f9fafb;
          border-radius: 6px;
          padding: 10px;
          border: 1px solid #e5e7eb;
        }

        .control-group {
          margin-bottom: 10px;
        }

        .control-group:last-child {
          margin-bottom: 0;
        }

        .control-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 500;
          color: #4f46e5;
          margin-bottom: 5px;
          font-family: 'JetBrains Mono', monospace;
        }

        .property-value {
          font-size: 10px;
          color: #059669;
          background: #ecfdf5;
          padding: 2px 6px;
          border-radius: 3px;
          border: 1px solid #d1fae5;
        }

        .hint {
          font-size: 9px;
          color: #9ca3af;
          font-style: italic;
          font-family: system-ui;
          margin-top: -3px;
          margin-bottom: 3px;
        }

        .button-group {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .control-btn {
          padding: 4px 8px;
          font-size: 10px;
          font-family: 'JetBrains Mono', monospace;
          background: #ffffff;
          color: #4b5563;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.1s ease;
          line-height: 1.2;
        }

        .control-btn:hover:not(:disabled) {
          background: #f3f4f6;
          border-color: #9ca3af;
          color: #1f2937;
        }

        .control-btn.active {
          background: #4f46e5;
          color: #ffffff;
          border-color: #4f46e5;
        }

        .control-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .range-slider {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #e5e7eb;
          outline: none;
          -webkit-appearance: none;
          appearance: none;
        }

        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #4f46e5;
          cursor: pointer;
        }

        .range-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #4f46e5;
          cursor: pointer;
          border: none;
        }

        .preview-panel {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .preview-panel .panel-title {
          flex-shrink: 0;
        }

        .preview-container {
          overflow: auto;
          flex: 1;
        }

        .flex-item {
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 12px;
          color: #ffffff;
          border-radius: 4px;
          transition: all 0.15s ease;
          flex-shrink: 0;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
          width: 48px;
          height: 48px;
          min-width: 28px;
          min-height: 28px;
        }

        /* Stretch overrides */
        .flex-item.stretch-height { height: auto; }
        .flex-item.stretch-width { width: auto; }

        /* Desktop/Mobile visibility */
        .desktop-only { display: block; }
        .mobile-only { display: none; }

        /* CSS Panel (desktop - right column) */
        .css-panel {
          background: #ffffff;
          border-radius: 6px;
          padding: 10px;
          border: 1px solid #e5e7eb;
        }

        .css-panel .css-code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          line-height: 1.6;
          color: #374151;
          margin: 0;
          white-space: pre-wrap;
          overflow-x: auto;
        }

        /* CSS Output (mobile - below everything) */
        .css-output {
          background: #ffffff;
          border-radius: 4px;
          padding: 8px;
          margin-top: 6px;
          border: 1px solid #e5e7eb;
        }

        .css-title {
          font-size: 9px;
          font-weight: 500;
          color: #6b7280;
          margin: 0 0 6px 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .css-output .css-code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          line-height: 1.5;
          color: #374151;
          margin: 0;
          white-space: pre-wrap;
          overflow-x: auto;
        }

        /* Tablet/Mobile - stack vertically, compact */
        @media (max-width: 900px) {
          .flexbox-explainer {
            padding: 6px;
          }

          .explainer-layout {
            grid-template-columns: 1fr;
            gap: 6px;
          }

          .controls-panel {
            order: 2;
            padding: 6px;
          }

          .preview-panel {
            order: 1;
          }

          .panel-title {
            font-size: 10px;
            margin-bottom: 6px;
            padding-bottom: 4px;
          }

          .control-group {
            margin-bottom: 6px;
          }

          .control-label {
            font-size: 10px;
            margin-bottom: 3px;
          }

          .button-group {
            gap: 2px;
          }

          .control-btn {
            padding: 2px 5px;
            font-size: 9px;
          }

          .flex-item {
            width: 32px;
            height: 32px;
            min-width: 24px;
            min-height: 24px;
            font-size: 10px;
          }

          .css-output {
            padding: 6px;
            margin-top: 4px;
          }

          .css-code {
            font-size: 9px;
          }

          .desktop-only { display: none; }
          .mobile-only { display: block; margin-top: 6px; }
        }
      `}</style>
    </div>
  );
}
