import { ReactNode, createContext, useState } from "react";

type FeatureSectionContextType = {
	activeOneTab: number;
	setActiveOneTab: (index: number) => void;
};

export const FeatureSectionContext = createContext<FeatureSectionContextType>({
	activeOneTab: 0,
	setActiveOneTab: () => undefined, 
});


const FeatureSectionContextProvider = ({ children }: { children: ReactNode }) => {
	const [activeOneTab, setActiveOneTab] = useState<number>(0);
	return <FeatureSectionContext.Provider value={{ activeOneTab, setActiveOneTab }}>{children}</FeatureSectionContext.Provider>;
};

export default FeatureSectionContextProvider;
