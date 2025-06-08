                      </span>
                      {/* Display category, subcategory, and result */}
                      <div className="mt-2 text-gray-600">
                        <p className="text-xs">
                          {test.answers && Object.values(test.answers)[0]?.subcategory ? 
                            `${Object.values(test.answers)[0].subcategory.replace(/_/g, ' ').replace(/^[a-z]/, (char: string) => char.toUpperCase())} ${test.testType.toUpperCase()} - ${getRiskLevel(test).text}`
                            : `${test.testType.toUpperCase()} - ${getRiskLevel(test).text}`
                          }
                        </p>
                      </div>
                    </div>
 