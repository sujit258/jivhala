'use client';

import React from 'react';

export type AvatarId = 'aaisarkhi' | 'premal' | 'majeshir' | 'preranadayi' | 'shant' | 'mitrasarkhi';
export type AvatarExpression = 'happy' | 'caring' | 'concerned' | 'sleepy' | 'playful' | 'motivational' | 'neutral';
export type AvatarViewMode = 'thumbnail' | 'card' | 'hero' | 'immersive-closeup';

interface AvatarGraphicProps {
  avatarId?: AvatarId | string;
  expression?: AvatarExpression;
  viewMode?: AvatarViewMode;
  className?: string;
  animate?: boolean;
}

export const AvatarGraphic: React.FC<AvatarGraphicProps> = ({
  avatarId = 'aaisarkhi',
  expression = 'caring',
  viewMode = 'card',
  className = '',
  animate = true
}) => {
  // Color palettes tailored for each companion identity
  const getColors = (id: string) => {
    switch (id) {
      case 'premal':
        return { skin: '#FCD5B5', hair: '#2A1B18', cheek: '#FFA2A2', accent: '#F875AA', cloth: '#FFD1DC' };
      case 'majeshir':
        return { skin: '#FCD8BA', hair: '#3E2723', cheek: '#FFB085', accent: '#FF9800', cloth: '#FFE082' };
      case 'preranadayi':
        return { skin: '#F5C99E', hair: '#1F1B24', cheek: '#FF9980', accent: '#E91E63', cloth: '#FF8A80' };
      case 'shant':
        return { skin: '#FCE0C8', hair: '#2E282A', cheek: '#E6A4B4', accent: '#81C784', cloth: '#C8E6C9' };
      case 'mitrasarkhi':
        return { skin: '#F7D0B2', hair: '#382B24', cheek: '#FFAB91', accent: '#4DD0E1', cloth: '#B2EBF2' };
      case 'aaisarkhi':
      default:
        return { skin: '#FAD4B2', hair: '#261C14', cheek: '#FF9E99', accent: '#E97878', cloth: '#FFCCBC' };
    }
  };

  const colors = getColors(avatarId);
  const isImmersive = viewMode === 'immersive-closeup';

  // Expression mouth & eyebrows calculation
  const renderMouth = () => {
    switch (expression) {
      case 'happy':
        return (
          <path
            d="M 175 252 Q 200 278 225 252"
            fill="#C2413C"
            stroke="#C2413C"
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      case 'concerned':
        return (
          <path
            d="M 182 258 Q 200 248 218 258"
            fill="none"
            stroke="#9C322E"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        );
      case 'sleepy':
        return (
          <ellipse cx="200" cy="254" rx="7" ry="4" fill="#9C322E" />
        );
      case 'playful':
        return (
          <path
            d="M 176 250 Q 200 274 224 250 Q 205 264 176 250"
            fill="#E97878"
            stroke="#B93838"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
      case 'motivational':
        return (
          <path
            d="M 178 250 Q 200 272 222 250"
            fill="#B7322D"
            stroke="#B7322D"
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      case 'caring':
      case 'neutral':
      default:
        return (
          <path
            d="M 180 252 Q 200 266 220 252"
            fill="none"
            stroke="#9C322E"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        );
    }
  };

  const renderEyebrows = () => {
    if (expression === 'concerned') {
      return (
        <g stroke="#261C14" strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M 142 166 Q 160 160 174 168" />
          <path d="M 226 168 Q 240 160 258 166" />
        </g>
      );
    }
    if (expression === 'playful') {
      return (
        <g stroke="#261C14" strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M 142 162 Q 160 156 174 164" />
          <path d="M 226 166 Q 242 168 258 172" />
        </g>
      );
    }
    return (
      <g stroke="#261C14" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M 142 164 Q 158 158 174 164" />
        <path d="M 226 164 Q 242 158 258 164" />
      </g>
    );
  };

  const isBlinking = animate;

  return (
    <div
      className={`relative select-none overflow-hidden transition-all duration-300 ${
        isImmersive
          ? 'w-full h-full flex items-center justify-center'
          : viewMode === 'hero'
          ? 'w-48 h-48 sm:w-56 sm:h-56'
          : viewMode === 'card'
          ? 'w-24 h-24 sm:w-28 sm:h-28'
          : 'w-16 h-16'
      } ${className}`}
    >
      <svg
        viewBox={isImmersive ? '70 80 260 260' : '50 40 300 320'}
        className={`w-full h-full object-contain ${
          animate && !isImmersive ? 'avatar-gentle-breathe' : ''
        } ${isImmersive && animate ? 'avatar-immersive-presence' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`glow-${avatarId}`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFF2EB" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FDE3D5" stopOpacity="0.1" />
          </radialGradient>
          <filter id={`softDepth-${avatarId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#2A1B18" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Ambient halo background for immersive screen */}
        {isImmersive && (
          <circle cx="200" cy="200" r="140" fill={`url(#glow-${avatarId})`} />
        )}

        {/* Hair Back Volume */}
        <ellipse cx="200" cy="180" rx="98" ry="105" fill={colors.hair} />

        {/* Neck & Torso/Shoulders */}
        <path
          d="M 160 260 Q 200 275 240 260 L 246 320 Q 200 335 154 320 Z"
          fill={colors.skin}
        />
        {/* Clothing / Saree drape */}
        <path
          d="M 120 320 Q 200 345 280 320 L 310 380 Q 200 410 90 380 Z"
          fill={colors.cloth}
          filter={`url(#softDepth-${avatarId})`}
        />
        <path
          d="M 140 310 Q 180 340 260 315"
          fill="none"
          stroke={colors.accent}
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Head & Face Contour */}
        <g filter={`url(#softDepth-${avatarId})`}>
          <path
            d="M 125 180 C 125 125, 275 125, 275 180 C 275 245, 235 285, 200 285 C 165 285, 125 245, 125 180 Z"
            fill={colors.skin}
          />
        </g>

        {/* Ears */}
        <circle cx="124" cy="195" r="14" fill={colors.skin} />
        <circle cx="276" cy="195" r="14" fill={colors.skin} />
        {/* Delicate golden earring rings */}
        <circle cx="122" cy="203" r="4" fill="#F6C358" />
        <circle cx="278" cy="203" r="4" fill="#F6C358" />

        {/* Cute Hair Front & Bangs */}
        <path
          d="M 124 165 C 124 105, 276 105, 276 165 C 265 145, 240 135, 200 138 C 160 135, 135 145, 124 165 Z"
          fill={colors.hair}
        />
        {/* Hair side wisps */}
        <path
          d="M 126 160 C 115 190, 118 225, 125 245 C 128 220, 130 185, 132 165 Z"
          fill={colors.hair}
        />
        <path
          d="M 274 160 C 285 190, 282 225, 275 245 C 272 220, 270 185, 268 165 Z"
          fill={colors.hair}
        />

        {/* Eyebrows */}
        {renderEyebrows()}

        {/* Big Expressive Caring Eyes */}
        {expression === 'sleepy' ? (
          // Sweet gentle closed sleepy eyes
          <g stroke="#261C14" strokeWidth="3.5" strokeLinecap="round" fill="none">
            <path d="M 148 198 Q 162 208 174 198" />
            <path d="M 226 198 Q 238 208 252 198" />
          </g>
        ) : (
          <g className={isBlinking ? 'avatar-eye-blink' : ''}>
            {/* Left Eye */}
            <ellipse cx="161" cy="195" rx="14" ry="17" fill="#FFFFFF" />
            <circle cx="162" cy="195" r="10" fill="#2E1C14" />
            {/* Iris warm brown ring */}
            <circle cx="162" cy="195" r="8" fill="#4E2B1E" />
            <circle cx="162" cy="195" r="5" fill="#140D0A" />
            {/* Catchlight sparkles for emotional connection */}
            <circle cx="159" cy="190" r="3.5" fill="#FFFFFF" />
            <circle cx="165" cy="198" r="1.5" fill="#FFFFFF" />

            {/* Right Eye */}
            <ellipse cx="239" cy="195" rx="14" ry="17" fill="#FFFFFF" />
            <circle cx="238" cy="195" r="10" fill="#2E1C14" />
            <circle cx="238" cy="195" r="8" fill="#4E2B1E" />
            <circle cx="238" cy="195" r="5" fill="#140D0A" />
            <circle cx="235" cy="190" r="3.5" fill="#FFFFFF" />
            <circle cx="241" cy="198" r="1.5" fill="#FFFFFF" />
          </g>
        )}

        {/* Round Spectacles for 'majeshir' avatar */}
        {avatarId === 'majeshir' && (
          <g stroke="#614126" strokeWidth="3" fill="none">
            <circle cx="161" cy="195" r="19" />
            <circle cx="239" cy="195" r="19" />
            <path d="M 180 195 Q 200 190 220 195" strokeWidth="2.5" />
            <path d="M 142 195 L 126 190" strokeWidth="2.5" />
            <path d="M 258 195 L 274 190" strokeWidth="2.5" />
          </g>
        )}

        {/* Traditional Red Bindi for 'aaisarkhi' and subtle dot for 'premal' */}
        {(avatarId === 'aaisarkhi' || avatarId === 'preranadayi') && (
          <circle cx="200" cy="166" r="4.5" fill="#D32F2F" />
        )}
        {avatarId === 'premal' && (
          <circle cx="200" cy="167" r="3" fill="#E97878" opacity="0.8" />
        )}

        {/* Soft Cute Nose */}
        <path
          d="M 197 220 Q 200 226 203 220"
          fill="none"
          stroke="#C48D71"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Rosy Caring Cheeks */}
        <ellipse cx="145" cy="218" rx="14" ry="8" fill={colors.cheek} opacity="0.6" />
        <ellipse cx="255" cy="218" rx="14" ry="8" fill={colors.cheek} opacity="0.6" />

        {/* Mouth */}
        {renderMouth()}
      </svg>
    </div>
  );
};
