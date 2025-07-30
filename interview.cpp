class Solution {
public:
    void sortColors(vector<int>& nums) {
        int n=nums.size();
        int count1=0;
        int count2=0;
        int count3=0;
        vector<int>result;
        for(int i=0;i<n;i++){
            if(nums[i]==0){
                count1++;
            }else if(nums[i]==1){
                count2++;
            }else if(nums[i]==2){
                count3++;
            }
        }
        for(int i=0;i<n;i++){
            if(count1>0){
                nums[i]=0;
                count1--;
            }else if(count2>0){
                (nums[i]=1);
                count2--;

            }else if(count3>0){
                result.push_back(nums[i]=2);
                count3--;
            }
        }
        
        // for(int i=0;i<n;i++){
        //     result[nums[i]]++;
        // }
        // int start=0;
        // int end=n-1;
        // for(int i=start,j=0;i<end;i++){
        //     while(result[i]>0){
        //         nums[i]=result[i];
        //         nums[j]=i;
        //         result[i]--;
        //     }
        // }
        
    }
};