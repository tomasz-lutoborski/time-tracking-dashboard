type TrackerNodes = {
    [index: string]: HTMLElement;
}

type TimeTracker = {
    title: string;
    timeframes: TimeFrames;
}

type TimeFrame = {
    current: number;
    previous: number;
}

type TimeFrames = {
    [index: string]: TimeFrame;
}

type UserTrackers = {
    name: string;
    timetrackers: TimeTracker[];
}

type TrackersData = {
    [name: string]: TimeFrames;
}

export { TrackerNodes, TimeFrame, TrackersData, TimeFrames, TimeTracker, UserTrackers };