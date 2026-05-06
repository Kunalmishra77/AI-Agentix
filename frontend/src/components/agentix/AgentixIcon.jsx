const AgentixIcon = ({ name, size = 18, color = 'currentColor', strokeWidth = 1.5 }) => {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  switch (name) {
    case 'content':   return <svg {...props}><path d="M5 4h11l3 3v13H5z"/><path d="M16 4v3h3"/><path d="M8 10h8M8 14h8M8 18h5"/></svg>;
    case 'growth':    return <svg {...props}><path d="M3 17l5-5 4 4 7-8"/><path d="M14 8h5v5"/></svg>;
    case 'sales':     return <svg {...props}><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M3 5h3l2.5 9h9.5l2-6H7"/></svg>;
    case 'cx':        return <svg {...props}><path d="M21 12a8 8 0 0 1-8 8H5l3-3a8 8 0 1 1 13-5z"/><circle cx="9" cy="12" r="0.6" fill={color}/><circle cx="13" cy="12" r="0.6" fill={color}/><circle cx="17" cy="12" r="0.6" fill={color}/></svg>;
    case 'research':  return <svg {...props}><circle cx="11" cy="11" r="6"/><path d="M16 16l5 5"/><path d="M8.5 11h5M11 8.5v5"/></svg>;
    case 'ops':       return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></svg>;
    case 'systems':   return <svg {...props}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>;
    case 'product':   return <svg {...props}><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 12l9 4 9-4"/><path d="M3 17l9 4 9-4"/></svg>;
    case 'finance':   return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M7 15h3"/></svg>;
    case 'logo':      return <svg width={size} height={size} viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="3" fill={color}/><circle cx="14" cy="14" r="7" stroke={color} strokeWidth={strokeWidth} fill="none" opacity="0.7"/><circle cx="14" cy="14" r="11" stroke={color} strokeWidth={strokeWidth} fill="none" opacity="0.35"/></svg>;
    case 'search':    return <svg {...props}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>;
    case 'arrow':     return <svg {...props}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'spark':     return <svg {...props}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>;
    case 'play':      return <svg {...props}><path d="M7 4l13 8-13 8z" fill={color} stroke="none"/></svg>;
    case 'mic':       return <svg {...props}><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>;
    case 'chat':      return <svg {...props}><path d="M21 12a8 8 0 0 1-8 8H5l3-3a8 8 0 1 1 13-5z"/></svg>;
    case 'check':     return <svg {...props}><path d="M5 12l4 4 10-10"/></svg>;
    case 'plus':      return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case 'menu':      return <svg {...props}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case 'close':     return <svg {...props}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case 'chevron':   return <svg {...props}><path d="M9 6l6 6-6 6"/></svg>;
    case 'chevdown':  return <svg {...props}><path d="M6 9l6 6 6-6"/></svg>;
    case 'node':      return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" fill={color}/></svg>;
    case 'shield':    return <svg {...props}><path d="M12 3l8 3v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/></svg>;
    case 'zap':       return <svg {...props}><path d="M13 3L4 14h7l-1 7 9-11h-7z"/></svg>;
    case 'globe':     return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case 'code':      return <svg {...props}><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 4l-4 16"/></svg>;
    case 'doc':       return <svg {...props}><path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/></svg>;
    default:          return null;
  }
};

export default AgentixIcon;
