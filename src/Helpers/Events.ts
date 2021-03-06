export enum CanvasEvent {
    WILL_RESIZE = 'will resize',
    DID_RESIZE = 'did resize',
    DID_ADD_VIEW = 'did add view',
    WILL_START_DRAW = 'will start draw',
    DID_START_DRAW = 'did start draw',
    WILL_DRAW = 'will draw',
    DID_DRAW = 'did draw',
    WILL_STOP_DRAW = 'will stop draw',
    DID_STOP_DRAW = 'did stop draw'
}

export enum AnimationEvent {
    WILL_START = 'will start',
    DID_START = 'did start',
    WILL_FINISH = 'will finish',
    DID_FINISH = 'did finish',
    WILL_TRANSFORM = 'will transform',
    DID_TRANSFORM = 'did transform'
}
