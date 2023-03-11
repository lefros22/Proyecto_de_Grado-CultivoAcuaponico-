# RN

- **Correlation Matrix Notebook:** Here you can see an example of the notebook used to evaluate the correlation in a time interval, only that it can be subject to bias due to the complexity in the interactions of the system, it is more a reference measure than an accurate validation.
- **Control validation Excel:** To analyze how consistently the network responded based on different data and conditions, 30 random samples were extracted from the dataset and the percentages of cycles were iterated in the 16 possible peak combinations (0%, 100%) in each of the actuators.
The results were consistent for all 30 samples. In this file you can see a summary table with the calculations made for 10 neural networks.

  - In sheet Combination strategy you can find the 16 combinations of maximum and minimum used in the analysis
  - In sheet Analysis you can find the nex tables:
    - ***Comparison with respect to not exercising actions:*** In this table you can see the variation of each of the action sets with respect to set 0 (do nothing, review the previous page).From here, the maximum possible real variation is obtained, which is the subtraction between the maximum positive variation vs. the maximum negative variation, with which the real variation is obtained.
    - ***Mean step response for each variable:*** Here is summarized the variation of the previous table for the unit step responses of each of the action variables while the rest are set to 0. In addition, it is calculated how representative this change is in contrast to the maximum possible variation between cases of the previous table
    - ***Sign consistency in changes:*** Here the consistency of the variations is analyzed, seen in another way, if the variations are an accidental or real fact that the network manages to interpret, the results indicated that for TDS 10/10 networks generate the same sign of variation (positive or negative). in each of the 16 cases, while for Temperature 97% of the cases are consistent.


## Conclusion
According to the previous results, it is validated that the system is controllable to some extent indirectly.
